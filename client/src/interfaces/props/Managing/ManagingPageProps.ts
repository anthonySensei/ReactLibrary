import Department from '../../Department';

export default interface ManagingPageProps {
    onAddDepartment: (department: Department) => void;
}
