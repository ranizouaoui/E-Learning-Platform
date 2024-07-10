import { ERole, Teacher } from "@/types";
import * as z from "zod";

export const SignInSchema = z.object({
  email: z
    .string({
      required_error: "البريد الإلكتروني مطلوب",
      invalid_type_error: "يجب أن يكون البريد الإلكتروني نص",
    })
    .email({ message: "يجب أن يكون البريد الإلكتروني صحيحاً" }),
  password: z
    .string({
      required_error: "كلمة المرور مطلوبة",
      invalid_type_error: "يجب أن تكون كلمة المرور نص",
    })
    .min(6, { message: "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل" }),
});

export const ResetSchema=z.object({
  email: z
    .string({
      required_error: "البريد الإلكتروني مطلوب",
      invalid_type_error: "يجب أن يكون البريد الإلكتروني نص",
    })
    .email({ message: "يجب أن يكون البريد الإلكتروني صحيحاً" }),
})

export const ResetPassword=z.object({
  newPassword: z.string({
    required_error: "كلمة المرور مطلوبة",
    invalid_type_error: "يجب أن تكون كلمة المرور نص",
  })
  .min(6, { message: "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل" }),
  confirmPassword: z.string({
    required_error: "تأكيد كلمة المرور مطلوب",
    invalid_type_error: "يجب أن تكون تأكيد كلمة المرور نص",
  }),
})


export const SignUpSchema = z.object({
  email: z
    .string({
      required_error: "البريد الإلكتروني مطلوب",
      invalid_type_error: "يجب أن يكون البريد الإلكتروني نص",
    })
    .email({ message: "يجب أن يكون البريد الإلكتروني صحيحاً" }),
   password: z
     .string({
       required_error: "كلمة المرور مطلوبة",
       invalid_type_error: "يجب أن تكون كلمة المرور نص",
     })
     .min(8, { message: "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل" })
     .refine((value) => {
      
       const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
       return regex.test(value);
     }, { message: "يجب أن تحتوي كلمة المرور على حرف كبير وحرف صغير ورقم واحد على الأقل" }),
  confirmPassword: z.string({
    required_error: "تأكيد كلمة المرور مطلوب",
    invalid_type_error: "يجب أن تكون تأكيد كلمة المرور نص",
  }),
  

  tel: z
  .string({
    required_error: "الهاتف مطلوب",
    invalid_type_error: "يجب أن يكون الهاتف نص",
  })
  .min(8, { message: "يجب أن يحتوي الهاتف على 8 أرقام على الأقل" })
  .max(8, { message: "يجب أن يحتوي الهاتف على 8 أرقام على الأكثر" }),
  firstname: z
    .string({
      required_error: "الاسم مطلوب",
      invalid_type_error: "يجب أن يكون الاسم نص",
    })
    .min(2, { message: "يجب أن يحتوي الاسم على حرفين على الأقل" }),
  lastname: z
    .string({
      required_error: "اللقب مطلوب",
      invalid_type_error: "يجب أن يكون اللقب نص",
    })
    .min(2, { message: "يجب أن يحتوي اللقب على حرفين على الأقل" }),
  roles: z.array(z.nativeEnum(ERole), {
    required_error: "يجب اختيار دور واحد على الأقل",
  }),
  teacherverification: z.optional(z.string()),
 
});

export const AddChildSchema = z.object({
  firstname: z
    .string({
      required_error: "الاسم مطلوب",
      invalid_type_error: "يجب أن يكون الاسم نص",
    })
    .min(2, { message: "يجب أن يحتوي الاسم على حرفين على الأقل" }),
  lastname: z
    .string({
      required_error: "اللقب مطلوب",
      invalid_type_error: "يجب أن يكون اللقب نص",
    })
    .min(2, { message: "يجب أن يحتوي اللقب على حرفين على الأقل" }),
  school_level: z.string({
    required_error: "المستوى الدراسي مطلوب",
    invalid_type_error: "يجب أن يكون المستوى الدراسي نص",
  }),
});

export const AddCourseSchema = z.object({
  video_url: z.optional(
    z.string({
      required_error: "رابط الفيديو مطلوب",
      invalid_type_error: "يجب أن يكون رابط الفيديو نص",
    }),
  ),
  pdf_url: z.optional(
    z.string({
      required_error: "رابط الملف مطلوب",
      invalid_type_error: "يجب أن يكون رابط الملف نص",
    }),
  ),
  name: z
    .string({
      required_error: "الاسم مطلوب",
      invalid_type_error: "يجب أن يكون الاسم نص",
    })
    .min(2, { message: "يجب أن يحتوي الاسم على حرفين على الأقل" }),
  term: z.string({
    required_error: "الفصل مطلوب",
    invalid_type_error: "يجب أن يكون الفصل نص",
  }),
  schoolLevel: z.string({
    required_error: "المستوى الدراسي مطلوب",
    invalid_type_error: "يجب أن يكون المستوى الدراسي نص",
  }),
  subject: z.string({
    required_error: "المادة مطلوبة",
    invalid_type_error: "يجب أن تكون المادة نص",
  }),
  date_of_addition: z.string({
    required_error: "تاريخ الإضافة مطلوب",
    invalid_type_error: "يجب أن يكون تاريخ الإضافة نص",
  }),
  quizzes: z.optional(
    z.array(
      z.object({
        question: z.string({
          required_error: "السؤال مطلوب",
          invalid_type_error: "يجب أن يكون السؤال نص",
        }),
        correct_option: z.string({
          required_error: "الإجابة الصحيحة مطلوبة",
          invalid_type_error: "يجب أن تكون الإجابة الصحيحة نص",
        }),
        option1: z.string({
          required_error: "الخيار الأول مطلوب",
          invalid_type_error: "يجب أن يكون الخيار الأول نص",
        }),
        option2: z.string({
          required_error: "الخيار الثاني مطلوب",
          invalid_type_error: "يجب أن يكون الخيار الثاني نص",
        }),
        option3: z.string({
          required_error: "الخيار الثالث مطلوب",
          invalid_type_error: "يجب أن يكون الخيار الثالث نص",
        })
      }),
    ),
  ),
});

export const AddTestSchema = z.object({
  name: z
    .string({
      required_error: "الاسم مطلوب",
      invalid_type_error: "يجب أن يكون الاسم نص",
    })
    .min(2, { message: "يجب أن يحتوي الاسم على حرفين على الأقل" }),
  pdf_url: z.string({
    required_error: "رابط الملف مطلوب",
    invalid_type_error: "يجب أن يكون رابط الملف نص",
  }),
  description: z
    .string({
      required_error: "الوصف مطلوب",
      invalid_type_error: "يجب أن يكون الوصف نص",
    })
    .min(2, { message: "يجب أن يحتوي الوصف على حرفين على الأقل" }),
  schoolLevel: z.string({
    required_error: "المستوى الدراسي مطلوب",
    invalid_type_error: "يجب أن يكون المستوى الدراسي نص",
  }),
  difficulty: z.string({
    required_error: "الصعوبة مطلوبة",
    invalid_type_error: "يجب أن تكون الصعوبة رقم",
  }),
  subject: z.string({
    required_error: "المادة مطلوبة",
    invalid_type_error: "يجب أن تكون المادة نص",
  }),
  duration: z.string({
    required_error: "المدة مطلوبة",
    invalid_type_error: "يجب أن تكون المدة رقم",
  }),
  correction_pdf_url: z.string({
    required_error: "رابط الملف مطلوب",
    invalid_type_error: "يجب أن يكون رابط الملف نص",
  }),
  term: z.string({
    required_error: "الفصل مطلوب",
    invalid_type_error: "يجب أن يكون الفصل نص",
  }),
});

export const AddGroupClassSchema = z.object({
  subject: z.string({
    required_error: "المادة مطلوبة",
    invalid_type_error: "يجب أن تكون المادة نص",
  }),
  teacherId: z.string({
    required_error: "المعلم مطلوب",
    invalid_type_error: "يجب أن يكون المعلم نص",
  }),
  schoolLevel: z.string({
    required_error: "المستوى الدراسي مطلوب",
    invalid_type_error: "يجب أن يكون المستوى الدراسي نص",
  }),
  dayId: z.string({
    required_error: "اليوم مطلوب",
    invalid_type_error: "يجب أن يكون اليوم نص",
  }),
  startTime: z.string({
    required_error: "وقت البدء مطلوب",
    invalid_type_error: "يجب أن يكون وقت البدء نص",
  }),
  endTime: z.string({
    required_error: "وقت الانتهاء مطلوب",
    invalid_type_error: "يجب أن يكون وقت الانتهاء نص",
  }),
});
export const addLiveMeetingSchema = z.object({
  name: z.string({
    required_error: "الاسم مطلوب",
    invalid_type_error: "يجب ان يكون الاسم نص",
  }),
  description: z.string({
    required_error: "الوصف مطلوب",
    invalid_type_error: "يجب ان يكون الوصف نص",
  }),
  dateTime: z.string({
    required_error: "الوقت مطلوب",
    invalid_type_error: "يجب ان يكون الوقت نص",
  }),
  term: z.string({
    required_error: "الفصل مطلوب",
    invalid_type_error: "يجب ان يكون الفصل نص",
  }),
  subject: z.string({
    required_error: "المادة مطلوبة",
    invalid_type_error: "يجب ان تكون المادة نص",
  }),
});

export type SignInValues = z.infer<typeof SignInSchema>;
export type SignUpValues = z.infer<typeof SignUpSchema>;
export type AddChildValues = z.infer<typeof AddChildSchema>;
export type AddCourseValues = z.infer<typeof AddCourseSchema>;
export type AddTestValues = z.infer<typeof AddTestSchema>;
export type addLiveMeetingValues = z.infer<typeof addLiveMeetingSchema>;
export type ResetValues=z.infer<typeof ResetSchema>
export type ResetPasswordValues=z.infer<typeof ResetPassword>