// components/marketing/activateaccount.tsx

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { BankAccountCard } from "@/components/marketing/BankAccountCard";
import apiUrl from '@/config';
interface Props {
  id: string;
}

function ActivateAcount({ id }: Props) {
  const router = useRouter();
  const [showBankAccountCard, setShowBankAccountCard] = useState(false);

  const subscribe = async () => {
    await axios.put(`${apiUrl}:8080/api/parents/${id}/upgrade`);
    toast.success("تم الاشتراك بنجاح");
    router.refresh();
  };

  return (
    <>
      {showBankAccountCard ? (
        <BankAccountCard onSubscribe={subscribe} />
      ) : (
        <Button variant="primary" onClick={() => setShowBankAccountCard(true)}>
          الاشتراك الآن
        </Button>
      )}
    </>
  );
}

export default ActivateAcount;
