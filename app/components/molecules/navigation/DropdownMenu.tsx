/**
 * Re-export file for backwards compatibility
 * 
 * This file maintains backward compatibility with existing imports while
 * the actual implementation has been moved to the dropdown-menu directory.
 */

import * as DropdownMenuComponents from './dropdown-menu/index';

// Re-export all dropdown menu components
export const DropdownMenu = DropdownMenuComponents.DropdownMenu;
export const DropdownMenuTrigger = DropdownMenuComponents.DropdownMenuTrigger;
export const DropdownMenuContent = DropdownMenuComponents.DropdownMenuContent;
export const DropdownMenuItem = DropdownMenuComponents.DropdownMenuItem;
export const DropdownMenuCheckboxItem = DropdownMenuComponents.DropdownMenuCheckboxItem;
export const DropdownMenuRadioItem = DropdownMenuComponents.DropdownMenuRadioItem;
export const DropdownMenuLabel = DropdownMenuComponents.DropdownMenuLabel;
export const DropdownMenuSeparator = DropdownMenuComponents.DropdownMenuSeparator;
export const DropdownMenuShortcut = DropdownMenuComponents.DropdownMenuShortcut;
export const DropdownMenuGroup = DropdownMenuComponents.DropdownMenuGroup;
export const DropdownMenuPortal = DropdownMenuComponents.DropdownMenuPortal;
export const DropdownMenuSub = DropdownMenuComponents.DropdownMenuSub;
export const DropdownMenuSubContent = DropdownMenuComponents.DropdownMenuSubContent;
export const DropdownMenuSubTrigger = DropdownMenuComponents.DropdownMenuSubTrigger;
export const DropdownMenuRadioGroup = DropdownMenuComponents.DropdownMenuRadioGroup; 