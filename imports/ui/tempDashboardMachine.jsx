import {Machine, assign} from 'xstate';

export const tempDashboardMachine = Machine({
    id: 'tempDashboardMachine',
    type: 'parallel',
    states: {
        room0: {
            initial: 'selected',
            states: {
                selected: {
                    on: { CLICK_R0: 'unselected' }
                },
                unselected: {
                    on: { CLICK_R0: 'selected' }
                }
            }
        },
        room1: {
            initial: 'selected',
            states: {
                selected: {
                    on: { R1_SELECTED: 'selected' }
                },
                unselected: {
                    on: { R1_SELECTED: 'unselected' }
                }
            }
        }
    }
})

