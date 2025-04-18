import {
  Controller,
  Get,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContentService } from './content.service';
import { FaqItemDto } from './dto/faq.dto';

@ApiTags('content')
@Controller('content')
export class ContentController {
  private readonly logger = new Logger(ContentController.name);

  constructor(private readonly contentService: ContentService) {}

  @Get('faqs')
  @ApiOperation({ summary: 'Get all frequently asked questions' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all FAQ categories with their questions and answers',
    type: [FaqItemDto],
  })
  getFaqs(): FaqItemDto[] {
    try {
      return this.contentService.getFaqs();
    } catch (error) {
      this.logger.error(`Error fetching FAQs: ${error.message}`, error.stack);
      throw new HttpException(
        'An error occurred while fetching FAQs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
