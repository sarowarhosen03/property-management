export const assetsDelete = async (urls: string[]) => {
  try {
    // Send the files to the server
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/upload`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          urls,
        }),
      },
    );

    const result: { error: boolean; message: string } = await response.json();
    return result;
  } catch (error) {
    throw new Error("Failed to delete");
  }
};
