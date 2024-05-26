const updateGroups = {
  tags: ['Group'],
  description: 'Обновление информации о группах.',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            groups: {
              type: 'array',
              items: {
                type: 'string',
                description: 'Название группы.',
              },
            },
          },
          required: ['groups'],
        },
        example: {
          groups: ['ИП-011', 'ИП-012', 'ИП-014', 'ИП-015', 'ИП-016', 'ИП-017'],
        },
      },
    },
  },
  responses: {
    204: {
      description: 'Успешное обновление данных о группах.',
    },
    500: {
      description: 'Внутренняя ошибка сервера.',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              error: {
                type: 'string',
                description: 'Описание ошибки.',
              },
            },
          },
          example: {
            error: 'An error occurred while updating group data.',
          },
        },
      },
    },
  },
};

export default updateGroups;
