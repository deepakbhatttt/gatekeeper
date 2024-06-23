import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import appwriteService from "../../appwrite/config.appwrite";
import { Button, Input, Select } from "../master";

const AddStudentForm = ({ post }) => {

    const { register, handleSubmit} = useForm({
        defaultValues: {
            id: post?.id || "",
            name: post?.name || "",
            course: post?.course || "",
            batch: post?.batch || "",
            mobno: post?.mobno || "",
            type: post?.type || ""
        }
    });

    const navigate = useNavigate();

    const submit = async (data) => {
        try {
            if (post) {
                const dbPost = await appwriteService.updateStudent(post.$id,{...data});
            } else {
                const dbPost = await appwriteService.addNewStudent({...data});
                if (dbPost) {
                    navigate(`/manage`);
                }
            }
        }catch(error) {
            console.log("Error:", error);
        }
    };
    return (
        <form onSubmit={handleSubmit(submit)} className="d-flex justify-content-center">
            <div className="px-2">
                <Input
                    // label="ID :"
                    placeholder="Student ID"
                    {...register("id", { required: true })}
                />
                <Input
                    // label="Name :"
                    placeholder="Full Name"
                    {...register("name", { required: true })}
                />
                <label>Course</label>
                <Select
                    options={["BTech", "BCom(hons.)", "BCA", "BBA"]}
                    label="Course"
                    placeholder="Course"
                    {...register("course", { required: true })}
                />
                <Input
                    // label="Batch :"
                    placeholder="Batch (E.g.  2020-2024)"
                    {...register("batch", { required: true })}
                />
                <Input
                    // label="Mob No. :"
                    placeholder="Mobile Number"
                    {...register("mobno", { required: true })}
                />
                <label>Student-Type (0-Hosteller, 1-Day Scholar)</label>
                <Select
                    options={["0", "1"]}
                    label="Student - Type"
                    {...register("type", { required: true })}
                />
                <Button type="submit" className="w-100">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
export default AddStudentForm;