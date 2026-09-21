import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from "@nestjs/common";
import { prisma } from "@syracrm/database";

@Controller("customers")
export class CustomersController {
  @Get()
  async getCustomers() {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        contracts: true,
        ndas: true,
        invoices: true,
        payments: true,
      },
    });
    return customers;
  }

  @Get(":id")
  async getCustomerById(@Param("id") id: string) {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        contracts: { orderBy: { createdAt: "desc" } },
        ndas: { orderBy: { createdAt: "desc" } },
        invoices: { orderBy: { createdAt: "desc" } },
        payments: { orderBy: { createdAt: "desc" } },
        assignedUser: true,
      },
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  @Post()
  async createCustomer(@Body() body: any) {
    const customer = await prisma.customer.create({
      data: {
        name: body.name || body.company,
        company: body.company,
        email: body.email,
        phone: body.phone || null,
        status: body.status || "Active",
        tag: body.tag || "Client",
        description: body.description || null,
        assigneeName: body.assignee?.name || body.assigneeName || null,
        assigneeRole: body.assignee?.role || body.assigneeRole || null,
        assigneeAvatar: body.assignee?.avatar || body.assigneeAvatar || null,
      },
      include: {
        contracts: true,
        ndas: true,
        invoices: true,
        payments: true,
      },
    });
    return customer;
  }

  @Patch(":id")
  async updateCustomer(@Param("id") id: string, @Body() body: any) {
    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.company !== undefined) updateData.company = body.company;
    if (body.email !== undefined) updateData.email = body.email;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.tag !== undefined) updateData.tag = body.tag;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.assigneeName !== undefined) updateData.assigneeName = body.assigneeName;

    const customer = await prisma.customer.update({
      where: { id },
      data: updateData,
    });
    return customer;
  }

  @Delete(":id")
  async deleteCustomer(@Param("id") id: string) {
    await prisma.customer.delete({ where: { id } });
    return { success: true };
  }
}
