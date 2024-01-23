import routeHandler from "@/lib/routeHandler";
import prisma from "@/lib/prisma";
import Answer from "@/schemas/Answer";

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

  const validation = await Answer.safeParseAsync(body);

  if (!validation.success) {
    throw validation.error;
  }

  const response = await prisma.questionAnswer.create({
    data: {
      questionId,
      ...body,
    },
  });

  return response;
});
