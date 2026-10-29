interface Props {
    name: string;
    label: string;
    description: string;
    checked: boolean;
    disabled?: boolean;
}
declare const SettingSwitch: import("svelte").Component<Props, {}, "">;
type SettingSwitch = ReturnType<typeof SettingSwitch>;
export default SettingSwitch;
