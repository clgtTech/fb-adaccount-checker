import * as React from 'react';
import * as mobx from 'mobx';
import { useIntl } from 'react-intl';
import { CSSTransition } from 'react-transition-group';
import { Banner } from 'draft-components';
import { stores } from '../../stores';
import { FlashMessage } from '../../stores/ui-store';
import styles from './flash-message-view.module.scss';

const transitionTimeouts = {
  enter: 280,
  exit: 200,
};
const { uiStore } = stores;

export const FlashMessageView = function FlashMessageView() {
  const intl = useIntl();
  const [shouldShowMessage, setShouldShowMessage] = React.useState(false);
  const [messageQueue, setMessageQueue] = React.useState<FlashMessage[]>([]);
  const [activeMessage] = messageQueue;

  React.useEffect(() => {
    return mobx.autorun(() => {
      const message = uiStore.flashMessage;

      if (message) {
        setShouldShowMessage(true);
        setMessageQueue((messages) => [...messages, message]);
      } else {
        setShouldShowMessage(false);
        window.setTimeout(() => {
          setMessageQueue((messages) => messages.slice(1));
        }, transitionTimeouts.exit);
      }
    });
  }, []);

  React.useEffect(() => {
    if (messageQueue.length > 1) {
      setShouldShowMessage(false);
      window.setTimeout(() => {
        setShouldShowMessage(true);
        setMessageQueue(messageQueue.slice(1));
      }, transitionTimeouts.exit);
    }
  }, [messageQueue]);

  return (
    <CSSTransition
      in={shouldShowMessage}
      timeout={transitionTimeouts}
      unmountOnExit={true}
      classNames={{
        enter: styles.enter,
        enterActive: styles.enterActive,
        exit: styles.exit,
        exitActive: styles.exitActive,
      }}
    >
      <Banner
        className={styles.banner}
        appearance={activeMessage?.type}
        actions={{
          label: intl.formatMessage({
            id: 'components.FlashMessageView.closeAction',
            defaultMessage: 'Close',
          }),
          onClick: () => uiStore.hideFlashMessage(),
        }}
      >
        {(function () {
          if (!activeMessage) {
            return null;
          }

          if (activeMessage.title && activeMessage.message) {
            return (
              <div className={styles.bannerContent}>
                <h3>{activeMessage.title}</h3>
                <p>{activeMessage.message}</p>
              </div>
            );
          }

          return activeMessage.message;
        })()}
      </Banner>
    </CSSTransition>
  );
};
