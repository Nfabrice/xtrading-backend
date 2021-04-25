import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDTO } from './dto/create-seller.dto';

@Controller('seller')
export class SellerController {
    constructor(private sellerService: SellerService) { }

    // add a seller
    @Post('/create')
    async addSeler(@Res() res, @Body() createSellerDTO: CreateSellerDTO) {
        const seller = await this.sellerService.addSeller(createSellerDTO);
        return res.status(HttpStatus.OK).json({
            message: "Seller has been created successfully",
            seller
        })
    }

    // Retrieve seller list
    @Get('sellers')
    async getAllSeller(@Res() res) {
        const sellers = await this.sellerService.getAllSeller();
        return res.status(HttpStatus.OK).json(sellers);
    }

    // Fetch a particular seller using ID
    @Get('seller/:sellerID')
    async getSeller(@Res() res, @Param('sellerID') sellerID) {
        const seller = await this.sellerService.getSeller(sellerID);
        if (!seller) throw new NotFoundException('Seller does not exist!');
        return res.status(HttpStatus.OK).json(seller);
    }

    // Update a seller's details
    @Put('/update')
    async updateSeller(@Res() res, @Query('sellerID') sellerID, @Body() createSellerDTO: CreateSellerDTO) {
        const seller = await this.sellerService.updateSeller(sellerID, createSellerDTO);
        if (!seller) throw new NotFoundException('Seller does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Seller has been successfully updated',
            seller
        });
    }

    // Delete a seller
    @Delete('/delete')
    async deleteSeller(@Res() res, @Query('sellerID') sellerID) {
        const seller = await this.sellerService.deleteSeller(sellerID);
        if (!seller) throw new NotFoundException('Seller does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Seller has been deleted',
            seller
        })
    }
}