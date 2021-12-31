type GlobalNotificationProps = {
  label: string;
  isShow: boolean;
};

export const GlobalNotification = ({
  label,
  isShow,
}: GlobalNotificationProps) => {
  return (
    <div
      className={`${
        isShow ? "visible" : "invisible opacity-0"
      } fixed mt-10 left-0 right-0 mx-auto w-fit p-3 text-white bg-gray-500 rounded-md shadow-xl transition-all`}
    >
      {label}
    </div>
  );
};
