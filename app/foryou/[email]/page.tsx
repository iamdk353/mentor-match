const page = async ({ params }: { params: { email: string } }) => {
  const { email } = await params;
  return <div className="h-screen">{email}</div>;
};
export default page;
