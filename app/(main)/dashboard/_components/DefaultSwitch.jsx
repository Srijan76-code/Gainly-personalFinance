"use client"

import { updateDefaultAccount } from '@/actions/account'
import useFetch from '@/app/hooks/use-fetch'

import { Switch } from '@/components/ui/switch'
import { Loader } from 'lucide-react'

import React, { useEffect } from 'react'
import { toast } from 'sonner'

const DefaultSwitch = ({ isDefault, id }) => {
  const {
    loading: updateDefaultLoading,
    fn: updateDefaultFn,
    data: updatedAccount,
    error,
  } = useFetch(updateDefaultAccount)

  const handleDefaultChange = async (e, isDefault, id) => {
    e.preventDefault(); // Prevent navigation

    if (isDefault) {
      toast.warning("You need atleast 1 default account");
      return; // Don't allow toggling off the default account
    }

    await updateDefaultFn(id)
  }
  useEffect(() => {
    if (updatedAccount?.success) {
      toast.success("Default account updated successfully");
    }
  }, [updatedAccount, updateDefaultLoading]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update default account");
    }
  }, [error]);
  return (
    <div>
      {updateDefaultLoading ?<Loader className='animate-spin' /> :
        (

          <Switch disabled={updateDefaultLoading} onClick={(e) => handleDefaultChange(e, isDefault, id)} checked={isDefault} className="cursor-pointer" />
        )}

    </div>
  )
}

export default DefaultSwitch
