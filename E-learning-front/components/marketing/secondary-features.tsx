import React from "react";

import { Container } from "@/components/container";
import { SecondaryFeatureCard } from "@/components/marketing/secondary-feature-card";

export function SecondaryFeatures() {
  return (
    <div className="pb-14 pt-20 sm:pb-20 sm:pt-32 lg:pb-32">
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
            دروس للجميع
          </h2>
          <p className="mt-6 text-lg font-medium text-muted-foreground">
            انضم إلى مجتمع نشط من المتعلمين الذين يشاركونك شغفك بالتطوير المستمر
            والتعلم مدى الحياة. شارك في المناقشات، وتعاون مع الأقران، وتبادل
            الأفكار أثناء تقدمك في رحلتك التعليمية.
          </p>
        </div>
        <div className="lg:mt-20">
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <SecondaryFeatureCard
              title="حصص دراسية مباشرة"
              description="انضم إلى حصص دراسية مباشرة مع مدرسين محترفين لتجربة تعلم مميزة وتفاعلية. توفر هذه الحصص فرصة للتواصل المباشر مع مدرسين مؤهلين ومتخصصين في مجالاتهم"
              image="https://img.freepik.com/free-photo/students-having-good-time-while-reading-className_1098-3587.jpg?t=st=1711114747~exp=1711118347~hmac=be331c53d2da5f5df71b5e60d3fd403bd0c8e2887567c8b84ac0f6587bdac6c9&w=1380"
            />
            <SecondaryFeatureCard
              title="مكتبة الفيديوهات"
              description="استمتع بمشاهدة مكتبة الفيديوهات الضخمة التي تحتوي على محتوى تعليمي متنوع ومميز. توفر مكتبة الفيديوهات محتوى تعليمي متنوع ومميز يغطي مجموعة واسعة من المواضيع"
              image="https://img.freepik.com/free-photo/medium-shot-little-kids-studying-bible_23-2149613739.jpg?t=st=1711114977~exp=1711118577~hmac=b7df5cbfe9053c14e6e8f444a33e3f608d0903b218732cd0ebb7f4597b3f00d7&w=1380"
            />
            <SecondaryFeatureCard
              title="مجتمع الدروس"
              description="انضم إلى مجتمع الدروس للتواصل مع الأقران والمدرسين والمتعلمين الآخرين. توفر مجتمع الدروس بيئة تعليمية محفزة تساعدك على تحقيق أهدافك التعليمية"
              image="https://img.freepik.com/free-photo/woman-drawing-showing-triangle-blackboard-children_259150-60360.jpg?t=st=1711115106~exp=1711118706~hmac=735a171c8d2064ca829f6004b013e9e83ed92b05babf5a8165d97be7c1e0cdb8&w=1380"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
