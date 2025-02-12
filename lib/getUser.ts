async function getUser() {
  const response = await fetch("http://localhost:3000/api/sign-in", {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
}

export { getUser };
