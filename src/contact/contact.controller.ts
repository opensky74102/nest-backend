import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Inject } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { MailService } from '../mail/mail.service';

@Controller('api/contact')
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
    private readonly mailService: MailService,
  ) { }
  @Post()
  // @UsePipes(ValidationPipe)
  create(@Body() createContactDto: CreateContactDto) {
    this.contactService.create(createContactDto);
    let to = createContactDto.email;
    let from = "opensky74102@gmail.com";
    let subject = "hellow opensky";
    let mail = "what are you doing wno";
    console.log(to, from, subject, mail)
    this.mailService.sendMail(to, from, subject, mail).then((res) => {
      console.log(res);
      return true;
    }).catch((e) => {
      console.log(e)
    });
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
