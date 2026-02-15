import React from "react";

const ConfirmModal = ({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  loading,
}) => {
  if (!open) return null;

  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 bg-black/33 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
      className="flex flex-col bg-white p-6 w-[344px] rounded-lg">
        <div className="flex items-center gap-2">
          <div className="flex p-2 bg-[#FFD5D5] rounded-full">
            <img className="w-6 h-6" src="/icons/confirm-modal.svg" alt="" />
          </div>
          <h2 className="text-[16px] text-[#FF0000] font-medium">{title}</h2>
        </div>
        <p className="w-full mt-4 text-[14px] text-[#828282]">{message}</p>

        <div className="flex mt-4 gap-4">
            <button onClick={onConfirm} disabled={loading} className="w-1/2 bg-[#FF0000] text-[14px] text-white rounded-md py-[13px] cursor-pointer hover:bg-[#d60808]">
                {loading ? "Deleting..." : "Delete"}
            </button>
            <button onClick={onCancel} className="w-1/2  text-[14px] text-[#A7A7A7] border rounded-md py-[13px] cursor-pointer ">
                Cancel
            </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
