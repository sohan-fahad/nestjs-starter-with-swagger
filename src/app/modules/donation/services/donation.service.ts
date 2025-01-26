import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Donation } from '../entities/donation.entity';
import { CreateDonationDto, DonationReportDto, FilterDonationDTO, UpdateDonationDto } from '../dtos/donation.dto';
import { BaseService } from '@src/app/base';

@Injectable()
export class DonationService extends BaseService<Donation> {
    constructor(
        @InjectRepository(Donation)
        private _repo: Repository<Donation>,
    ) {
        super(_repo);
    }

    async getDonations(filters: FilterDonationDTO) {
        // const queryBuilder = this._repo.createQueryBuilder('donation')
        //     .leftJoinAndSelect('donation.donor', 'donor');

        const data = await this.findAllBase(filters, {
            relations: ['donor'],
        })

        return data;

        // Date range filter
        // if (filters.startDate) {
        //     queryBuilder.andWhere('donation.createdAt >= :startDate', { startDate: filters.startDate });
        // }
        // if (filters.endDate) {
        //     queryBuilder.andWhere('donation.createdAt <= :endDate', { endDate: filters.endDate });
        // }

        // // Status filter
        // if (filters.status) {
        //     queryBuilder.andWhere('donation.status = :status', { status: filters.status });
        // }

        // // Gateway filter
        // if (filters.paymentGateway) {
        //     queryBuilder.andWhere('donation.paymentGateway = :gateway', { gateway: filters.paymentGateway });
        // }

        // // Search filter (name or transaction ID)
        // if (filters.searchTerm) {
        //     queryBuilder.andWhere(
        //         '(donation.donorName LIKE :search OR donation.transactionId LIKE :search)',
        //         { search: `%${filters.searchTerm}%` }
        //     );
        // }

        // // Soft delete handling
        // if (!filters.includeDeleted) {
        //     queryBuilder.andWhere('donation.deletedAt IS NULL');
        // }

        // // Pagination
        // queryBuilder
        //     .skip((filters.page - 1) * filters.limit)
        //     .take(filters.limit)
        //     .orderBy('donation.createdAt', 'DESC');

        // const [data, total] = await queryBuilder.getManyAndCount();
        // console.log("🚀 ~ DonationService ~ getDonations ~ data:", data)

        // return {
        //     data,
        //     meta: {
        //         limit: +filters.limit,
        //         page: +filters.page,
        //         skip: filters.page * filters.limit,
        //         total
        //     }
        // };
    }

    async create(createDonationDto: CreateDonationDto, userId: string): Promise<Donation> {
        const donation = this._repo.create({
            ...createDonationDto,
            createdBy: userId,
            donor: { id: userId },
        });
        return this._repo.save(donation);
    }

    async updateDonation(
        id: string,
        updateDonationDto: UpdateDonationDto,
        userId: string
    ): Promise<Donation> {
        const donation = await this._repo.findOne({ where: { id } });
        if (!donation) {
            throw new NotFoundException('Donation not found');
        }

        Object.assign(donation, {
            ...updateDonationDto,
            updatedBy: userId,
            updatedAt: new Date(),
        });

        return this._repo.save(donation);
    }

    async softDelete(id: string, userId: string): Promise<void> {
        const donation = await this._repo.findOne({ where: { id } });
        if (!donation) {
            throw new NotFoundException('Donation not found');
        }

        donation.deletedBy = userId;
        donation.deletedAt = new Date();
        await this._repo.save(donation);
    }

    async generateReport(reportDto: DonationReportDto): Promise<any> {
        const queryBuilder = this._repo.createQueryBuilder('donation');

        if (reportDto.startDate) {
            queryBuilder.andWhere('donation.createdAt >= :startDate', {
                startDate: new Date(reportDto.startDate)
            });
        }

        if (reportDto.endDate) {
            queryBuilder.andWhere('donation.createdAt <= :endDate', {
                endDate: new Date(reportDto.endDate)
            });
        }

        const totalDonations = await queryBuilder.getCount();
        const totalAmount = await queryBuilder
            .select('SUM(donation.amount)', 'total')
            .getRawOne();

        const donationsByGateway = await queryBuilder
            .select('donation.paymentGateway', 'gateway')
            .addSelect('SUM(donation.amount)', 'total')
            .groupBy('donation.paymentGateway')
            .getRawMany();

        return {
            totalDonations,
            totalAmount: totalAmount.total || 0,
            donationsByGateway,
        };
    }
}