import * as React from "react";
import { X } from "lucide-react";
import styles from "./Dialog.module.css"
import {
    Root as Dialog,
    Trigger as DialogTrigger,
    Portal as DialogPortal,
    Close as DialogClose,
    Overlay as DialogOverlay,
    Content as DialogContent,
    Title as DialogTitle,
    Description as DialogDescription,
  } from "@radix-ui/react-dialog";
  
  const CustomDialogOverlay = React.forwardRef((props, ref) => (
    <DialogOverlay
      ref={ref}
      className={styles.dialogOverlay}
      {...props}
    />
  ));
  CustomDialogOverlay.displayName = DialogOverlay.displayName;
  
  const CustomDialogContent = React.forwardRef(({ children, ...props }, ref) => (
    <DialogPortal>
      <CustomDialogOverlay />
      <DialogContent ref={ref} className={styles.dialogContent} {...props}>
        {children}
        <DialogClose className={styles.dialogClose}>
          <X className={styles.smallWH} />
          <span className={styles.close}>Close</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  ));
  CustomDialogContent.displayName = DialogContent.displayName;
  
  const CustomDialogHeader = ({ className, ...props }) => (
    <div className={`${styles.dialogHeader} ${className}`} {...props} />
  );
  CustomDialogHeader.displayName = "DialogHeader";
  
  const CustomDialogFooter = ({ className, ...props }) => (
    <div className={`${styles.dialogFooter} ${className}`} {...props} />
  );
  CustomDialogFooter.displayName = "DialogFooter";
  
  export {
    Dialog,
    DialogTrigger,
    DialogPortal,
    CustomDialogOverlay as DialogOverlay,
    DialogClose,
    CustomDialogContent as DialogContent,
    CustomDialogHeader as DialogHeader,
    CustomDialogFooter as DialogFooter,
    DialogTitle,
    DialogDescription,
  };