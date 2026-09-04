// ProductForm.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const ProductForm = ({ onClose, onSubmit, defaultValues = {} }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues,
    });

    useEffect(() => {
        if (!defaultValues._id) {
            // নতুন পণ্যের জন্য আজকের তারিখ সেট
            const today = new Date().toISOString().split("T")[0];
            setValue("stockDate", today);
        }
        reset(defaultValues);
    }, [defaultValues, reset, setValue]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
                <h2 className="text-xl font-bold mb-4">
                    { defaultValues._id ? "পণ্য আপডেট করুন" : "নতুন পণ্য যোগ করুন" }
                </h2>

                <form
                    onSubmit={ handleSubmit(onSubmit) }
                    className="flex flex-col gap-3"
                >
                    <input
                        { ...register("name", { required: "নাম দিতে হবে" }) }
                        placeholder="নাম*"
                        className="border p-2 rounded-lg w-full"
                    />
                    { errors.name && (
                        <p className="text-red-500 text-sm">{ errors.name.message }</p>
                    ) }

                    <input
                        { ...register("category", { required: "ক্যাটাগরি দিতে হবে" }) }
                        placeholder="ক্যাটাগরি*"
                        className="border p-2 rounded-lg w-full"
                    />
                    { errors.category && (
                        <p className="text-red-500 text-sm">{ errors.category.message }</p>
                    ) }

                    <input
                        type="number"
                        { ...register("stock", { required: true, min: 0 }) }
                        placeholder="স্টক*"
                        className="border p-2 rounded-lg w-full"
                    />

                    {/* stockDate: নতুন পণ্যে আজকের তারিখ, আপডেটে readonly */ }
                    <input
                        type="date"
                        { ...register("stockDate", { required: true }) }
                        className="border p-2 rounded-lg w-full"
                        readOnly
                    />

                    <input
                        type="number"
                        { ...register("purchasePrice", { required: true, min: 0 }) }
                        placeholder="ক্রয় মূল্য*"
                        className="border p-2 rounded-lg w-full"
                    />

                    <input
                        type="number"
                        { ...register("sellPrice", { required: true, min: 0 }) }
                        placeholder="বিক্রয় মূল্য*"
                        className="border p-2 rounded-lg w-full"
                    />

                    <input
                        { ...register("location") }
                        placeholder="লোকেশন"

                        className="border p-2 rounded-lg w-full"
                    />

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={ onClose }
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            বাতিল
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            { defaultValues._id ? "আপডেট" : "যোগ করুন" }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
