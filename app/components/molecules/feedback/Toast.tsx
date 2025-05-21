/**
 * Re-export file for backwards compatibility
 * 
 * This file maintains backward compatibility with existing imports while
 * the actual implementation has been moved to the toast directory.
 */

import * as ToastComponents from './toast/index';

// Re-export all toast components
export const ToastProvider = ToastComponents.ToastProvider;
export const ToastViewport = ToastComponents.ToastViewport;
export const Toast = ToastComponents.Toast;
export const ToastTitle = ToastComponents.ToastTitle;
export const ToastDescription = ToastComponents.ToastDescription;
export const ToastClose = ToastComponents.ToastClose;
export const ToastAction = ToastComponents.ToastAction;

// Re-export types
export type ToastProps = ToastComponents.ToastProps;
export type ToastActionElement = ToastComponents.ToastActionElement; 