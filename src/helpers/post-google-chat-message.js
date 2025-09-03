export const postGoogleChatMessage = async ({
  webhookUrl,
  repository,
  tag,
  userName,
  userEmail,
  branch,
  commitUrl,
  googleChatBuildButtonLink,
  googleChatTagButtonLink,
  googleChatImageUrl,
  //build is used on eval context
  buildJobName,
}) => {
  tag = tag.trim();
  repository = repository.trim();

  googleChatBuildButtonLink = eval(`\`${googleChatBuildButtonLink}\``);
  googleChatTagButtonLink = eval(`\`${googleChatTagButtonLink}\``);

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cardsV2: [
        {
          cardId: `${repository}/${tag}`,
          card: {
            header: {
              title: `${repository}/${tag}`,
              subtitle: `Deployment started in repository <b>${repository}</b> with version <b>${tag}</b>`,
              imageUrl: googleChatImageUrl,
            },
            sections: [
              {
                widgets: [
                  {
                    textParagraph: {
                      text: `Tag <b><a href="${commitUrl}">${tag}</a></b> generated on branch <b>${branch.trim()}</b> by <b>${userName.trim()}</b> (${userEmail.trim()})`,
                    },
                  },
                ],
              },
              {
                widgets: [
                  {
                    buttonList: {
                      buttons: [
                        {
                          text: "Tag Details",
                          onClick: {
                            openLink: {
                              url: googleChatTagButtonLink,
                            },
                          },
                        },
                        {
                          text: "Build Details",
                          onClick: {
                            openLink: {
                              url: googleChatBuildButtonLink,
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  });

  if (!res.ok) {
    console.error("Erro ao enviar:", await res.text());
  }
};
