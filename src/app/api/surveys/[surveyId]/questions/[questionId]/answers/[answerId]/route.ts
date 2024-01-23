import routeHandler from "@/lib/routeHandler";
import prisma from "@/lib/prisma";


export const DELETE = routeHandler(async (request, context) => {
  const { surveyId, questionId, answerId } = context.params;
  const response = await prisma.survey.update({
    where: {
      id: surveyId,
    },
    data: {
      questions: {
        update: {
          where: {
            id: questionId,
          },
          data: {
            answers: {
              delete: {
                id: answerId,
              },
            },
          },
        },
      },
    },
    include: {
      questions: {
        include: {
          answers: true,
        },
      },
    },
  });

  return response;
});


export const GET = routeHandler(async (request, context) => {
    const { surveyId, questionId, answerId } = context.params;
    const response = await prisma.questionAnswer.findUniqueOrThrow({
        where: {
        id: answerId,
        },
    });

    return response;
});