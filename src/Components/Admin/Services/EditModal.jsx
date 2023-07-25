import React from 'react'

function EditModal() {
    return (
        <>
            <Button
                onClick={handleOpen}
                className="flex items-center gap-3" color="blue" size="sm"
            >
                <PlusCircleIcon strokeWidth={2} className="h-5 w-5" />
                Add Service</Button>

            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardHeader
                        variant="gradient"
                        className="mb-4 grid h-28 place-items-center bg-blue-gray-500"
                    >
                        <Typography variant="h3" color="white">
                            Add Services
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleAddService} encType="multipart/form-data">
                        <CardBody className="flex flex-col gap-4">
                            <Input
                                label="Title"
                                name="title"
                                size="lg"
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            />

                            <Input label="Description"
                                name="description"
                                size="lg"
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            />

                            <Input
                                label="Image"
                                size="lg"
                                name="icon"
                                type="file"
                                onChange={(e) => {
                                    setIcon(e.target.files[0])
                                }}
                            />

                        </CardBody>
                        <CardFooter className="pt-0 mb-3">
                            <Button
                                variant="gradient"
                                color="blue-gray"
                                fullWidth type="submit"
                            >
                                Add Service
                            </Button>

                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </>
    )
}

export default EditModal
