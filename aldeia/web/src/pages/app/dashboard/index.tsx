import { Card, CardBody, Typography } from "@material-tailwind/react";


export const DashboardPage = () => {

    return (
        <div className="p-10">
            <header>
                <Typography variant="h5" className="font-medium">Dashboard</Typography>
            </header>

            <main className="mt-10">
                <div className="grid grid-cols-1 gap-5 mt-10 lg:grid-cols-2">
                    <Card className="rounded-md">
                        <CardBody className="flex items-center justify-center px-2 pb-0 h-80">
                            <Typography variant="small" color="gray">No Result</Typography>
                        </CardBody>
                    </Card>
                    <Card className="rounded-md">
                        <CardBody className="flex items-center justify-center px-2 pb-0 h-80">
                            <Typography variant="small" color="gray">No Result</Typography>
                        </CardBody>
                    </Card>
                </div>

                <div className="mt-10">
                    <Card className="rounded-md">
                        <CardBody className="flex items-center justify-center px-2 pb-0 h-80">
                            <Typography variant="small" color="gray">No Result</Typography>
                        </CardBody>
                    </Card>
                </div>

                <div className="mt-10">
                    <Card className="rounded-md">
                        <CardBody className="flex items-center justify-center px-2 pb-0 h-80">
                            <Typography variant="small" color="gray">No Result</Typography>
                        </CardBody>
                    </Card>
                </div>
            </main>
        </div>
    )
};