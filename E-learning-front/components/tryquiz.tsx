import React, { useEffect, useMemo, useState } from "react";
import { Quiz } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, Crown, Dices, Timer, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "./ui/button";

const formSchema = z.object({
  question: z.string().min(1, {
    message: "الرجاء إدخال سؤال",
  }),
  option1: z.string().min(1, {
    message: "الرجاء إدخال الخيار الأول",
  }),
  option2: z.string().min(1, {
    message: "الرجاء إدخال الخيار الثاني",
  }),
  option3: z.string().min(1, {
    message: "الرجاء إدخال الخيار الثالث",
  }),
  correctOption: z.string().min(1, {
    message: "الرجاء إدخال الخيار الصحيح",
  }),
});

interface ConfirmModelProps {
  extractedquizes: Quiz[];
}

const Tryquiz: React.FC<ConfirmModelProps> = ({ extractedquizes }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [quiz, setQuiz] = useState(extractedquizes);
  const [isOpen, setIsOpen] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
  const [displayResult, setDisplayResult] = useState(false);
  const [secondsAvailable, setSecondsAvailable] = useState(10);
  const [isFalse, setIsFalse] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentQuestion = useMemo(() => {
    return quiz[questionIndex];
  }, [questionIndex, quiz]);

  const shuffleOptions = () => {
    const options = [
      currentQuestion.option1,
      currentQuestion.option2,
      currentQuestion.option3,
    ];
    const shuffled = options.sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!currentQuestion) return () => clearInterval(interval);

    if (currentQuestion) {
      shuffleOptions();
    }
    if (currentQuestion && secondsAvailable === 0) {
      return () => clearInterval(interval);
    }

    interval = setInterval(() => {
      setSecondsAvailable((prev) => prev - 1);
    }, 1000); // Adjust the interval to 1 second
    return () => clearInterval(interval);
  }, [currentQuestion]);

  useEffect(() => {
    if (secondsAvailable === 0 && questionIndex === quiz.length - 1) {
      setDisplayResult(true);
      setQuiz([]);
    } else if (secondsAvailable === 0) {
      setQuestionIndex((prevIndex) =>
        prevIndex < quiz.length - 1 ? prevIndex + 1 : prevIndex
      );
      questionIndex === quiz.length - 1 ? setDisplayResult(true) : null;
      setWrongAnswer(wrongAnswer + 1);
      setIsFalse(true);
      setSecondsAvailable(10);
    }
  }, [secondsAvailable, questionIndex, quiz.length]);

  const handleShowQuiz = () => {
    setIsOpen(true);
    setSecondsAvailable(10);
    setQuestionIndex(0);
    setCorrectAnswer(0);
    setWrongAnswer(0);
    setDisplayResult(false);
    setQuiz(extractedquizes);
  };

  const handleAnswer = (selectedOption: any) => {
    setSecondsAvailable(10);

    if (selectedOption.option === currentQuestion.correct_option) {
      setCorrectAnswer(correctAnswer + 1);
      setIsFalse(false);
      toast.success("إجابة صحيحة", {
        icon: "👏",
      });
    } else {
      setWrongAnswer(wrongAnswer + 1);
      setIsFalse(true);
      toast.error("إجابة خاطئة", {
        icon: "😢",
      });
    }
    setQuestionIndex((prevIndex) =>
      prevIndex < quiz.length ? prevIndex + 1 : prevIndex
    );
    if (questionIndex === quiz.length - 1) {
      setDisplayResult(true);
    }
    setSelectedOption(0);
  };

  const handleExitQuiz = () => {
    setIsOpen(false);
    setQuiz([]);
    setSecondsAvailable(10);
    setQuestionIndex(0);
    setCorrectAnswer(0);
    setWrongAnswer(0);
    setDisplayResult(false);
  };

  return (
    <>
      <Toaster />
      <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <AlertDialogTrigger
          className="flex items-center gap-x-2"
          onClick={handleShowQuiz}
          asChild
        >
          <Button variant="primary" size={"sm"}>
            <Dices className="" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-full md:max-w-[50%] ">
          <div className="flex flex-row justify-between">
            <AlertDialogTitle>الاختبارات لفصلك</AlertDialogTitle>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3">
              <div>
                <div className="flex flex-row gap-1">
                  <Timer size={25} />
                  <span>{secondsAvailable}/10</span>
                </div>
              </div>
              <div className="flex flex-row gap-1">
                <AlertCircleIcon size={25} />
                <span className="text-red-600">{wrongAnswer}</span>
              </div>
              <div>
                <div className="flex flex-row gap-1">
                  <div>
                    <Crown size={25} className="text-green-600" />
                  </div>
                  <span className="text-green-600">{correctAnswer}</span>
                </div>
                <div></div>
              </div>
            </div>
          </div>

          {!currentQuestion && displayResult && correctAnswer > wrongAnswer ? (
            <div>
              <h1 className="border bg-green-300 p-2">
                🎉 تهانينا، لقد اجتزت الاختبار
              </h1>
            </div>
          ) : !currentQuestion &&
            displayResult &&
            correctAnswer < wrongAnswer ? (
            <div>
              <h1 className="border bg-red-300 p-2">
                آسف 😢 لقد فشلت في الاختبار، يرجى إعادة المحاولة لفتح الفصل
                التالي
              </h1>
            </div>
          ) : null}

          <AlertDialogDescription>
            <div className="mb-6 mt-6">
              {quiz.length === 0 && !isLoading ? (
                <div className="flex flex-col items-center justify-center">
                  <h1>لا يوجد اختبار متاح لهذا الفصل</h1>
                </div>
              ) : null}
            </div>
            {currentQuestion && (
              <div>
                <div>
                  <h1
                    dangerouslySetInnerHTML={{
                      __html: currentQuestion.question,
                    }}
                  />
                </div>
                {shuffledOptions.map((option, index) => (
                  <div key={index}>
                    <Button
                      onClick={() => {
                        setSelectedOption(index + 1);
                        handleAnswer({ option });
                      }}
                      variant={
                        selectedOption === index + 1 ? "default" : "secondary"
                      }
                      className="mb-3 mt-6 w-full justify-start"
                    >
                      {index + 1}. {option}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </AlertDialogDescription>

          <AlertDialogFooter>
            {displayResult && (
              <Button variant="destructive" onClick={handleExitQuiz}>
                <XCircle className="mr-2" />
                خروج
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
        <AlertDialogOverlay />
      </AlertDialog>
    </>
  );
};

export default Tryquiz;
