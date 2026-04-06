const { da } = require("zod/v4/locales");
const prisma = require("../config/prisma");

const getAllApplications = async (userId) => {
  return await prisma.application.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};


const getAllApplicationById = async (id, userId) => {
  const application = await prisma.application.findFirst({
    where: { 
        id: parseInt(id),
        userId },
  });

  if (!application){
    throw new Error("Application not found");
  }

  return application;
};

const createApplication = async (data, userId) => {
  return await prisma.application.create({
    data: {
      company: data.company,
      jobTitle: data.company,
      jobTitle: data.jobTitle,
      status: data.status,
      location: data.location || null,
      source: data.source || null,
      jobUrl: data.jobUrl || null,
      details: data.details || null,
      appliedAt: data.appliedAt ? new Date(data.appliedAt) : new Date(),
      userId,
    },
  });
};

const updateApplication = async (id, data, userId) => {
  const application = await prisma.application.findFirst({
    where: {
      id: parseInt(id),
      userId,
    },
  });

  if (!application) {
    throw new Error("Application not found");
  }

  return await prisma.application.update({
    where: { id: parseInt(id) },
    data: {
      ...(data.company !== undefined && { company: data.company }),
      ...(data.jobTitle !== undefined && { jobTitle: data.jobTitle }),
      ...(data.status !== undefined && { status: data.status }),
      ...(data.location !== undefined && { location: data.location || null }),
      ...(data.source !== undefined && { source: data.source || null }),
      ...(data.jobUrl !== undefined && { jobUrl: data.jobUrl || null }),
      ...(data.details !== undefined && { details: data.details || null }),
      ...(data.appliedAt !== undefined && {
        appliedAt: data.appliedAt ? new Date(data.appliedAt) : null,
      }),
    },
  });
};

const deleteApplication = async (id, userId) => {
  const application = await prisma.application.findFirst({
    where: {
      id: parseInt(id),
      userId,
    },
  });

  if (!application) {
    throw new Error("Application not found");
  }

  return await prisma.application.delete({
    where: { id: parseInt(id) },


  });
};

module.exports = {
  getAllApplications,
  getAllApplicationById,
  createApplication,
  updateApplication,
  deleteApplication,
};