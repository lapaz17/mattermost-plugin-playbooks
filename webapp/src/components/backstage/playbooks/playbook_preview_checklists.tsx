// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useState} from 'react';
import {useIntl} from 'react-intl';

import styled from 'styled-components';

import {Checklist, ChecklistItem as ChecklistItemType, PlaybookWithChecklist} from 'src/types/playbook';
import Section from 'src/components/backstage/playbooks/playbook_preview_section';
import {ChecklistItem} from 'src/components/checklist_item/checklist_item';
import CollapsibleChecklist, {TitleHelpTextWrapper} from 'src/components/collapsible_checklist';

interface Props {
    id: string;
    playbook: PlaybookWithChecklist;
}

const PlaybookPreviewChecklists = (props: Props) => {
    const {formatMessage} = useIntl();

    const initialArray = Array(props.playbook.checklists.length).fill(false);
    const [checklistsCollapsed, setChecklistsCollapsed] = useState(initialArray);

    if (props.playbook.checklists.length === 0) {
        return null;
    }

    return (
        <Section
            id={props.id}
            title={formatMessage({defaultMessage: 'Checklists'})}
        >
            {props.playbook.checklists.map((checklist: Checklist, checklistIndex: number) => (
                <CollapsibleChecklist
                    key={checklist.title}
                    title={checklist.title}
                    items={checklist.items}
                    index={checklistIndex}
                    numChecklists={props.playbook.checklists.length}
                    collapsed={checklistsCollapsed[checklistIndex]}
                    setCollapsed={(newState) => {
                        const newArr = {...checklistsCollapsed};
                        newArr[checklistIndex] = newState;
                        setChecklistsCollapsed(newArr);
                    }}
                    titleHelpText={(
                        <TitleHelpTextWrapper>
                            {formatMessage(
                                {defaultMessage: '{numTasks, number} {numTasks, plural, one {task} other {tasks}}'},
                                {numTasks: checklist.items.length},
                            )}
                        </TitleHelpTextWrapper>
                    )}
                    disabledOrRunID={true}
                >
                    <ChecklistContainer className='checklist'>
                        {checklist.items.map((checklistItem: ChecklistItemType, index: number) => {
                            return (
                                <ChecklistItem
                                    key={checklist.title + checklistItem.title}
                                    checklistItem={checklistItem}
                                    checklistNum={checklistIndex}
                                    itemNum={index}
                                    playbookRunId={''}
                                    dragging={false}
                                    disabled={true}
                                    menuEnabled={true}
                                    collapsibleDescription={false}
                                    newItem={false}
                                />
                            );
                        })}
                    </ChecklistContainer>
                </CollapsibleChecklist>
            ))}
        </Section>
    );
};

const ChecklistContainer = styled.div`
    background-color: var(--center-channel-bg);
    padding: 16px 12px;
`;

export default PlaybookPreviewChecklists;
