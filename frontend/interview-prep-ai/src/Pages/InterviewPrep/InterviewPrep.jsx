import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "./components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";
import AIResponsePreview from "./components/AIResponsePreview";

function InterviewPrep() {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question }
      );

      if (response.data && response.data.explanation) {
        setExplanation(response.data);
      } else {
        setErrorMsg("No explanation received");
      }
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation, Try again later");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.QUESTION.PIN(questionId)
      );
      // console.log(response);
      // fetchSessionDetailsById();

      if (response.data && response.data.question) {
        // toast.success('Question Pinned Successfully');
        fetchSessionDetailsById();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Add more questions to a session
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      // ✅ Safely close Drawer & clear stale explanation when adding new questions
      setOpenLeanMoreDrawer(false);
      setExplanation(null);
      setErrorMsg("");

      const payload = {
        role: sessionData?.role,
        experience:
          sessionData?.experience && sessionData.experience > 0
            ? sessionData.experience
            : 1,
        topicsToFocus: Array.isArray(sessionData?.topicsToFocus)
          ? sessionData.topicsToFocus.join(", ")
          : sessionData?.topicsToFocus || "",
        numberOfQuestions: 10,
      };

      console.log("Uploading more with:", payload);

      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        payload
      );

      const generatedQuestions = aiResponse.data;

      await axiosInstance.post(API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: generatedQuestions,
      });

      toast.success("Added More QA!!!");
      fetchSessionDetailsById();
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || ""}
        questions={sessionData?.questions || "_ _"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
        <h2 className="text-lg color-black font-semibold">Interview Q & A</h2>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <motion.div
            className="col-span-12"
            animate={{
              width: openLeanMoreDrawer ? "58.333333%" : "66.666667%",
            }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          >
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => (
                <motion.div
                  key={data._id || index}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100,
                    delay: index * 0.1,
                    damping: 15,
                  }}
                  layout // This is the key prop that animates position changes
                  layoutId={`question-${data._id || index}`} // Helps framer track specific items
                >
                  <>
                    <QuestionCard
                      question={data?.question}
                      answer={data?.answer}
                      onLearnMore={() =>
                        generateConceptExplanation(data.question)
                      }
                      isPinned={data?.isPinned}
                      onTogglePin={() => toggleQuestionPinStatus(data._id)}
                    />
                  </>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="flex items-center justify-center mt-5">
              <button
                className="flex items-center gap-3 text-sm text-white font-medium bg-black px-2 py-2 mr-2 rounded text-nowrap cursor-pointer"
                disabled={isLoading || isUpdateLoader}
                onClick={uploadMoreQuestions}
              >
                {isUpdateLoader ? (
                  <SpinnerLoader />
                ) : (
                  <LuListCollapse className="text-lg" />
                )}
                Load More
              </button>
            </div>
          </motion.div>
        </div>

        <Drawer
          isOpen={openLeanMoreDrawer}
          onClose={() => setOpenLeanMoreDrawer(false)}
          title={!isLoading && explanation ? explanation?.title : ""}
        >
          {errorMsg && (
            <p className="flex gap-2 text-sm text-amber-600 font-medium">
              <LuCircleAlert className="mt-1" /> {errorMsg}
            </p>
          )}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SkeletonLoader />
            </motion.div>
          )}

          {!isLoading && explanation && (
            <div className="mt-4 text-gray-700 bg-gray-50 px-5 py-3 rounded-lg">
              <AIResponsePreview content={explanation?.explanation} />
            </div>
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  );
}

export default InterviewPrep;
