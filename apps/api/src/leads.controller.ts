import { Controller, Get, Post, Patch, Delete, Param, Body, NotFoundException } from "@nestjs/common";
import { prisma } from "@syracrm/database";

@Controller()
export class LeadsController {
  @Get("leads")
  async getLeads() {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        proposals: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
    return leads;
  }

  @Get("leads/:id")
  async getLeadById(@Param("id") id: string) {
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        proposals: {
          orderBy: { createdAt: "desc" },
          include: {
            documents: true,
          },
        },
        proposalDocuments: true,
        assignedUser: true,
      },
    });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return lead;
  }

  @Post("leads")
  async createLead(@Body() body: any) {
    const lead = await prisma.lead.create({
      data: {
        status: body.status || "Contacted",
        tag: body.tag || "New lead",
        company: body.company,
        description: body.description,
        dueDate: body.dueDate || "Today",
        links: Array.isArray(body.links) ? body.links : [],
        comments: Array.isArray(body.comments) ? body.comments : [],
        assigneeName: body.assignee?.name || body.assigneeName || null,
        assigneeRole: body.assignee?.role || body.assigneeRole || null,
        assigneeAvatar: body.assignee?.avatar || body.assigneeAvatar || null,
      },
      include: {
        proposals: true,
      },
    });
    return lead;
  }

  @Patch("leads/:id")
  async updateLead(@Param("id") id: string, @Body() body: any) {
    const updateData: any = {};
    if (body.status !== undefined) updateData.status = body.status;
    if (body.tag !== undefined) updateData.tag = body.tag;
    if (body.company !== undefined) updateData.company = body.company;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.dueDate !== undefined) updateData.dueDate = body.dueDate;
    if (body.links !== undefined) updateData.links = body.links;
    if (body.comments !== undefined) updateData.comments = body.comments;
    if (body.assigneeName !== undefined) updateData.assigneeName = body.assigneeName;
    if (body.assigneeRole !== undefined) updateData.assigneeRole = body.assigneeRole;
    if (body.assigneeAvatar !== undefined) updateData.assigneeAvatar = body.assigneeAvatar;

    const lead = await prisma.lead.update({
      where: { id },
      data: updateData,
      include: {
        proposals: true,
      },
    });
    return lead;
  }

  @Delete("leads/:id")
  async deleteLead(@Param("id") id: string) {
    await prisma.lead.delete({
      where: { id },
    });
    return { success: true };
  }

  // Proposals Endpoints
  @Get("leads/:id/proposals")
  async getLeadProposals(@Param("id") leadId: string) {
    const proposals = await prisma.proposal.findMany({
      where: { leadId },
      orderBy: { createdAt: "desc" },
      include: {
        documents: true,
      },
    });
    return proposals;
  }

  @Post("leads/:id/proposals")
  async createProposal(@Param("id") leadId: string, @Body() body: any) {
    // Check if lead exists
    const lead = await prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${leadId} not found`);
    }

    const totalAmount = typeof body.totalAmount === "number" 
      ? body.totalAmount 
      : parseFloat(body.totalAmount || "0");

    const proposal = await prisma.proposal.create({
      data: {
        leadId,
        title: body.title || `${lead.company} Proposal`,
        description: body.description || "",
        status: body.status || "Draft",
        totalAmount: isNaN(totalAmount) ? 0 : totalAmount,
        currency: body.currency || "USD",
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        documentUrl: body.documentUrl || null,
        pdfUrl: body.pdfUrl || null,
      },
      include: {
        documents: true,
      },
    });

    // Automatically update lead status to "Offer sent" if proposal status is "Sent"
    if (body.status === "Sent" && lead.status !== "Offer sent") {
      await prisma.lead.update({
        where: { id: leadId },
        data: { status: "Offer sent" },
      });
    }

    return proposal;
  }

  @Patch("proposals/:id")
  async updateProposal(@Param("id") id: string, @Body() body: any) {
    const updateData: any = {};
    if (body.title !== undefined) updateData.title = body.title;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.totalAmount !== undefined) {
      const amt = typeof body.totalAmount === "number" ? body.totalAmount : parseFloat(body.totalAmount);
      updateData.totalAmount = isNaN(amt) ? 0 : amt;
    }
    if (body.currency !== undefined) updateData.currency = body.currency;
    if (body.dueDate !== undefined) updateData.dueDate = body.dueDate ? new Date(body.dueDate) : null;
    if (body.documentUrl !== undefined) updateData.documentUrl = body.documentUrl;
    if (body.pdfUrl !== undefined) updateData.pdfUrl = body.pdfUrl;

    const proposal = await prisma.proposal.update({
      where: { id },
      data: updateData,
    });
    return proposal;
  }

  @Delete("proposals/:id")
  async deleteProposal(@Param("id") id: string) {
    await prisma.proposal.delete({
      where: { id },
    });
    return { success: true };
  }
}
