import {Machine, assign} from 'xstate';

export const tempDashboardMachine = Machine({
    id: 'tempDashboardMachine',
    type: 'parallel',
    states: {
        room0: {
            initial: 'selected',
            states: {
                selected: {
                    on: { CLICK_ROOM0: 'unselected' }
                },
                unselected: {
                    on: { CLICK_ROOM0: 'selected' }
                }
            }
        },
        room1: {
            initial: 'selected',
            states: {
                selected: {
                    on: { CLICK_ROOM1: 'unselected' }
                },
                unselected: {
                    on: { CLICK_ROOM1: 'selected' }
                }
            }
        },
        room2: {
            initial: 'selected',
            states: {
                selected: {
                    on: { CLICK_ROOM2: 'unselected' }
                },
                unselected: {
                    on: { CLICK_ROOM2: 'selected' }
                }
            }
        },
        room3: {
            initial: 'selected',
            states: {
                selected: {
                    on: { CLICK_ROOM3: 'unselected' }
                },
                unselected: {
                    on: { CLICK_ROOM3: 'selected' }
                }
            }
        },
        room4: {
            initial: 'selected',
            states: {
                selected: {
                    on: { CLICK_ROOM4: 'unselected' }
                },
                unselected: {
                    on: { CLICK_ROOM4: 'selected' }
                }
            }
        },
        room5: {
            initial: 'selected',
            states: {
                selected: {
                    on: { CLICK_ROOM5: 'unselected' }
                },
                unselected: {
                    on: { CLICK_ROOM5: 'selected' }
                }
            }
        },
        room6: {
            initial: 'selected',
            states: {
                selected: {
                    on: { CLICK_ROOM6: 'unselected' }
                },
                unselected: {
                    on: { CLICK_ROOM6: 'selected' }
                }
            }
        },

    }
})

