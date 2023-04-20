export const getNotionPages = async (apiKey: string, databaseId: string, filter: any) => {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        filter,
      }),
    }
  );
  const data = await response.json();
  return data.results || [];
}

export const appendNotionBlockChildren = async (apiKey: string, pageId: string, children: any[]) => {
  const response = await fetch(
    `https://api.notion.com/v1/blocks/${pageId}/children`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        children,
      }),
    }
  );
  const data = await response.json();
  return data;
}