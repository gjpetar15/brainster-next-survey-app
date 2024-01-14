import routeHandler from "@/lib/routeHandler";
import prisma from "@/lib/prisma";

export const GET = routeHandler(async (request, context) => {
  const { surveyId, questionId } = context.params;
  const response = await prisma.questionAnswer.findMany({
    where: {
      questionId,
    },
  });

  return response;
});

export const POST = routeHandler(async (request, context) => {
  const { surveyId, questionId } = context.params;
  const body = await request.json();
  const response = await prisma.questionAnswer.create({
    data: {
      questionId,
      ...body,
    },
  });

  return response;
});
