

export default {
  name: "vippsCard",
  title: "Vipps Card",
  type: "document",
  fields: [
    {
      name: "serviceTitle",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "object",
      fields: [
        {
          name: "period",
          title: "Period",
          type: "string",
          options: {
            list: [
              { title: "Day", value: "dag" },
              { title: "5 Days", value: "5dager" },
            
            ],
          },
        },
        {
          name: "price",
          title: "Price",
          type: "number",
        },
      ],
    },
    {
      name: "url",
      title: "URL",
      type: "url",
      description: "Link to the Vipps page",
    },
  ],
};
