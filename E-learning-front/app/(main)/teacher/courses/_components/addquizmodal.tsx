import { useState } from "react";
import { Quiz } from "@/types"; // Adjust the import path if necessary
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ConfirmModelProps {
  value: Quiz[];
  onchange: (value: Quiz[]) => void;
}

const MultipleQuizSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string().min(1, { message: "الرجاء إدخال سؤال" }),
      options: z.array(z.string().min(1, { message: "الرجاء إدخال الخيار" })).length(3, { message: "يجب أن يكون لديك 3 خيارات" }),
      correct_option: z.string().min(1, { message: "الرجاء إدخال الخيار الصحيح" }),
    })
  ),
});

export const QuizModel = ({ value, onchange }: ConfirmModelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(MultipleQuizSchema),
    defaultValues: {
      questions: [{ question: "", options: ["", "", ""], correct_option: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const handleAddQuestion = () => {
    append({ question: "", options: ["", "", ""], correct_option: "" });
  };

  const handleRemoveQuestion = (index: number) => {
    remove(index);
  };

  const handleSaveQuiz = () => {
    const quizData = form.getValues();
    const formattedQuizData: Quiz[] = quizData.questions.map((q) => ({
      question: q.question,
      option1: q.options[0],
      option2: q.options[1],
      option3: q.options[2],
      correct_option: q.correct_option,
    }));
    onchange(formattedQuizData);
    setIsOpen(false);
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <AlertDialogTrigger className="flex items-center gap-x-2" asChild>
          <Button className="mt-4 w-full p-4" size="sm" variant="ghost">
            إضافة اختبار
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[50%] max-h-[80vh] overflow-y-auto">
          <AlertDialogTitle>إضافة اختبار لدورتك</AlertDialogTitle>
          <AlertDialogDescription>
            هنا يمكنك إضافة اختبار إلى دورتك
          </AlertDialogDescription>
          <Form {...form}>
            <form className="mt-4 space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4">
                  <FormField
                    control={form.control}
                    name={`questions.${index}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="السؤال"
                            className="mt-1 w-full rounded-md border border-gray-300 p-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormLabel className="mt-3 flex">الخيارات</FormLabel>
                  {form.watch(`questions.${index}.options`).map((option, optIndex) => (
                    <FormField
                      key={optIndex}
                      control={form.control}
                      name={`questions.${index}.options.${optIndex}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder={`الخيار ${optIndex + 1}`}
                              className="mt-1 w-full rounded-md border border-gray-300 p-2"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <FormField
                    control={form.control}
                    name={`questions.${index}.correct_option`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="الخيار الصحيح"
                            className="mt-1 w-full rounded-md border border-gray-300 p-2"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button variant="destructive" type="button" onClick={() => handleRemoveQuestion(index)} className="w-full">
                    حذف السؤال
                  </Button>
                </div>
              ))}
              <Button variant="secondary" type="button" onClick={handleAddQuestion} className="w-full">
                إضافة سؤال آخر
              </Button>
              <div className="flex space-x-4">
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    form.reset();
                  }}
                >
                  إلغاء
                </Button>
                <Button variant="primary" type="button" onClick={handleSaveQuiz} className="flex-1">
                  حفظ الاختبار
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
