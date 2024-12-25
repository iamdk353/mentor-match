import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import connectMongo from "@/DB/connect";
import User from "@/model/user";
import { User2 } from "lucide-react";

const page = async ({ params }: { params: { email: string } }) => {
  await connectMongo();
  const { email } = await params;
  const data = await User.findOne({ email: decodeURIComponent(email) });
  return (
    <div className="h-screen">
      <Card className="w-full max-w-3xl mx-auto bg-blue-50 border-blue-200">
        <CardHeader className="border-b border-blue-200">
          <CardTitle className="text-blue-800">Notification Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border border-blue-200 p-4">
            {data.notifications
              .reverse()
              .map((activity: string, id: number) => (
                <div key={id} className="mb-4 flex items-center space-x-4">
                  <div>
                    <User2 className="text-blue-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-blue-800">
                      <span className="text-blue-600">
                        {activity.split(",")[0]}
                      </span>{" "}
                    </p>
                    <p className="text-sm text-blue-500">
                      {activity.split(",").splice(1)}
                    </p>
                  </div>
                </div>
              ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
