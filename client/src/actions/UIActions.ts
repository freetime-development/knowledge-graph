
export type UIActions =
  ToggleSidebarVisibility

export enum UITypeKeys {
  TOGGLE_SIDEBAR_VISIBILITY = 'TOGGLE_SIDEBAR_VISIBILITY'
}

export interface ToggleSidebarVisibility {
  type: UITypeKeys.TOGGLE_SIDEBAR_VISIBILITY
}

export const toggleSidebarVisibility = (): ToggleSidebarVisibility => ({
  type: UITypeKeys.TOGGLE_SIDEBAR_VISIBILITY
})
