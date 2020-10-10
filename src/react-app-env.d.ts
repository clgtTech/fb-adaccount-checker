/// <reference types="react-scripts" />

declare module 'focus-manager' {
  /**
   * If the element is focusable it will be focused. Otherwise the first descendant that is
   * focusable will be focused. If this fails the element itself will be made focusable and
   * will be focused.
   *
   * @param element
   */
  function focusFirstInElement(element: HTMLElement): void;

  /**
   * The last descendant that is focusable will be focused. If this fails the element itself will
   * be made focusable and will be focused.
   *
   * @param element
   */
  function focusLastInElement(element: HTMLElement): void;

  /**
   * @description
   * `focusManager.capture` will only allow modal and it's descendants to be focused.
   * Whenever an element outside modal receives focus, modal or the first focusable
   * descendant inside modal will be focused. Thus helping keyboard users to stay inside
   * the modal until it is dismissed.
   *
   * `focusManager.capture` will keep listening for focus events until it is released.
   *
   * This function should be used when opening a modal dialog.
   *
   * @param modal
   * @param [focusElement] - This element will receive the initial focus instead of
   *   the first focusable descendant. If no `focusElement` is provided
   *   `focusManager.focusInElement(modal)` will be used to determine which element
   *   will receive the initial focus.
   * @param [backgroundElement] - It defaults to `document`. Any time focus gets set
   *   inside this element focus gets reset to the modal element. Note, the modal
   *   element can be a descendant of the `backgroundElement`
   */
  function capture(
    modal: HTMLElement,
    focusElement?: HTMLElement,
    backgroundElement?: HTMLElement
  ): void;

  /**
   * `focusManager.release` will release the captured focus and allow elements to be focused
   * as they normally would be.
   *
   * This function should be used when closing a modal dialog.
   *
   * @param [focusElement] - This element will receive focus when this function is executed.
   */
  function release(focusElement?: HTMLElement): void;
}
