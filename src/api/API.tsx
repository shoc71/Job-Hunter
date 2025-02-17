// api.tsx
const searchGithub = async () => {
  try {
    const start = Math.floor(Math.random() * 100000000) + 1;
    const response = await fetch(
      `https://api.github.com/users?since=${start}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Invalid API response, check the network tab");
    }
    return data;
  } catch (err) {
    console.error("An error occurred in searchGithub:", err);
    return [];
  }
};

const searchGithubUser = async (username: string) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Invalid API response, check the network tab");
    }
    return data;
  } catch (err) {
    console.error("An error occurred in searchGithubUser:", err);
    return {};
  }
};

export { searchGithub, searchGithubUser };
