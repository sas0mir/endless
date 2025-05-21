export default defintEventHandler(async (event) => {
 await clearUserSession(event);
  await sendRedirect(event, '/', 302);
}
