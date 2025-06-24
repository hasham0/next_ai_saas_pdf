import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import BgGradient from "@/components/shared/bg-gradient";
import { MotionDiv } from "@/components/shared/motion-wrapper";
import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import { containerVariants } from "@/lib/constant";
import { hasReachedUploadLimit } from "@/lib/user";

type Props = {};
export const maxDuration = 60;
export default async function UploadPage({}: Props) {
  const user = await currentUser();
  if (!user || !user.id) {
    redirect("/sign-in");
  }
  const { uploadLimit } = await hasReachedUploadLimit(user.id);

  if (!uploadLimit) {
    redirect("/dashboard");
  }
  return (
    <section className="min-h-screen">
      <BgGradient />

      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <UploadHeader />
          <UploadForm />
        </div>
      </MotionDiv>
    </section>
  );
}
