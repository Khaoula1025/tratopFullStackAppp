import React, { useState } from "react";
import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
    Select,
    Option,
} from "@material-tailwind/react";
function DataEntryForm() {
    const [formData, setFormData] = useState({ field1: "", field2: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/data-entry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data.message);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8 gap-2 sm:gap-6">
            <Card
                color="transparent"
                shadow={false}
                className="sm:w-full max-w-lg mx-4 sm:mx-0"
            >
                <Typography
                    variant="h4"
                    color="blue-gray"
                    className="text-center mb-4"
                >
                    Ajouter une tache
                </Typography>
                <form className="mt-8 mb-2 w-full">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Nom
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="titre"
                            className=" !border-blue-gray-200"
                            labelProps={{
                                className:
                                    "before:content-none after:content-none",
                            }}
                        />
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Prenom
                        </Typography>
                        <Textarea
                            placeholder="Description de l'événement"
                            className=" !border-blue-gray-200"
                            labelProps={{
                                className:
                                    "before:content-none after:content-none",
                            }}
                        />
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Maitre d'ouvrage{" "}
                        </Typography>
                        <Input
                            size="lg"
                            placeholder=""
                            className=" !border-blue-gray-200"
                            labelProps={{
                                className:
                                    "before:content-none after:content-none",
                            }}
                        />
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Télephone
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="06 ......."
                            className=" !border-blue-gray-200"
                            labelProps={{
                                className:
                                    "before:content-none after:content-none",
                            }}
                        />
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Cin
                        </Typography>
                        <Input
                            size="lg"
                            placeholder=""
                            className=" !border-blue-gray-200"
                            labelProps={{
                                className:
                                    "before:content-none after:content-none",
                            }}
                        />
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Date début
                        </Typography>
                        <Input
                            type="date"
                            size="lg"
                            placeholder=""
                            className=" !border-blue-gray-200"
                            labelProps={{
                                className:
                                    "before:content-none after:content-none",
                            }}
                        />
                        <Typography
                            variant="h6"
                            color="blue-gray"
                            className="-mb-3"
                        >
                            Date fin
                        </Typography>
                        <Input
                            type="date"
                            size="lg"
                            placeholder=""
                            className=" !border-blue-gray-200"
                            labelProps={{
                                className:
                                    "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <Button className="mt-6" color="blue-gray" fullWidth>
                        Ajouter la tache
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default DataEntryForm;
