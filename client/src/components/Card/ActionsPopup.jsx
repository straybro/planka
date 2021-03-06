import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Menu } from 'semantic-ui-react';
import { withPopup } from '../../lib/popup';
import { Popup } from '../../lib/custom-ui';

import { useSteps } from '../../hooks';
import ProjectMembershipsStep from '../ProjectMembershipsStep';
import LabelsStep from '../LabelsStep';
import EditDueDateStep from '../EditDueDateStep';
import EditTimerStep from '../EditTimerStep';
import DeleteStep from '../DeleteStep';

import styles from './ActionsPopup.module.css';

const StepTypes = {
  USERS: 'USERS',
  LABELS: 'LABELS',
  EDIT_DUE_DATE: 'EDIT_DUE_DATE',
  EDIT_TIMER: 'EDIT_TIMER',
  DELETE: 'DELETE',
};

const ActionsStep = React.memo(
  ({
    card,
    projectMemberships,
    currentUserIds,
    labels,
    currentLabelIds,
    onNameEdit,
    onUpdate,
    onDelete,
    onUserAdd,
    onUserRemove,
    onLabelAdd,
    onLabelRemove,
    onLabelCreate,
    onLabelUpdate,
    onLabelDelete,
    onClose,
  }) => {
    const [t] = useTranslation();
    const [step, openStep, handleBack] = useSteps();

    const handleNameEditClick = useCallback(() => {
      onNameEdit();
      onClose();
    }, [onNameEdit, onClose]);

    const handleUsersClick = useCallback(() => {
      openStep(StepTypes.USERS);
    }, [openStep]);

    const handleLabelsClick = useCallback(() => {
      openStep(StepTypes.LABELS);
    }, [openStep]);

    const handleEditDueDateClick = useCallback(() => {
      openStep(StepTypes.EDIT_DUE_DATE);
    }, [openStep]);

    const handleEditTimerClick = useCallback(() => {
      openStep(StepTypes.EDIT_TIMER);
    }, [openStep]);

    const handleDeleteClick = useCallback(() => {
      openStep(StepTypes.DELETE);
    }, [openStep]);

    const handleDueDateUpdate = useCallback(
      dueDate => {
        onUpdate({
          dueDate,
        });
      },
      [onUpdate],
    );

    const handleTimerUpdate = useCallback(
      timer => {
        onUpdate({
          timer,
        });
      },
      [onUpdate],
    );

    if (step) {
      switch (step.type) {
        case StepTypes.USERS:
          return (
            <ProjectMembershipsStep
              items={projectMemberships}
              currentUserIds={currentUserIds}
              onUserSelect={onUserAdd}
              onUserDeselect={onUserRemove}
              onBack={handleBack}
            />
          );
        case StepTypes.LABELS:
          return (
            <LabelsStep
              items={labels}
              currentIds={currentLabelIds}
              onSelect={onLabelAdd}
              onDeselect={onLabelRemove}
              onCreate={onLabelCreate}
              onUpdate={onLabelUpdate}
              onDelete={onLabelDelete}
              onBack={handleBack}
            />
          );
        case StepTypes.EDIT_DUE_DATE:
          return (
            <EditDueDateStep
              defaultValue={card.dueDate}
              onUpdate={handleDueDateUpdate}
              onBack={handleBack}
              onClose={onClose}
            />
          );
        case StepTypes.EDIT_TIMER:
          return (
            <EditTimerStep
              defaultValue={card.timer}
              onUpdate={handleTimerUpdate}
              onBack={handleBack}
              onClose={onClose}
            />
          );
        case StepTypes.DELETE:
          return (
            <DeleteStep
              title={t('common.deleteCard', {
                context: 'title',
              })}
              content={t('common.areYouSureYouWantToDeleteThisCard')}
              buttonContent={t('action.deleteCard')}
              onConfirm={onDelete}
              onBack={handleBack}
            />
          );
        default:
      }
    }

    return (
      <>
        <Popup.Header>
          {t('common.cardActions', {
            context: 'title',
          })}
        </Popup.Header>
        <Popup.Content>
          <Menu secondary vertical className={styles.menu}>
            <Menu.Item className={styles.menuItem} onClick={handleNameEditClick}>
              {t('action.editTitle', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleUsersClick}>
              {t('common.members', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleLabelsClick}>
              {t('common.labels', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleEditDueDateClick}>
              {t('action.editDueDate', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleEditTimerClick}>
              {t('action.editTimer', {
                context: 'title',
              })}
            </Menu.Item>
            <Menu.Item className={styles.menuItem} onClick={handleDeleteClick}>
              {t('action.deleteCard', {
                context: 'title',
              })}
            </Menu.Item>
          </Menu>
        </Popup.Content>
      </>
    );
  },
);

ActionsStep.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  card: PropTypes.object.isRequired,
  projectMemberships: PropTypes.array.isRequired,
  currentUserIds: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  currentLabelIds: PropTypes.array.isRequired,
  /* eslint-enable react/forbid-prop-types */
  onNameEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUserAdd: PropTypes.func.isRequired,
  onUserRemove: PropTypes.func.isRequired,
  onLabelAdd: PropTypes.func.isRequired,
  onLabelRemove: PropTypes.func.isRequired,
  onLabelCreate: PropTypes.func.isRequired,
  onLabelUpdate: PropTypes.func.isRequired,
  onLabelDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default withPopup(ActionsStep);
