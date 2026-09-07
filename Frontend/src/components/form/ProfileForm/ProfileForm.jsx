import { memo, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileFormSchema } from '../../../utils/validation';
import UrlInput from '../UrlInput/UrlInput';
import SubmitButton from '../SubmitButton/SubmitButton';

const defaultValues = {
  githubUrl: '',
  codechefUrl: '',
  codeforcesUrl: '',
  leetcodeUrl: '',
};

const ProfileForm = memo(function ProfileForm({ onSubmit, isLoading }) {
  const methods = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const fieldDescriptions = useMemo(
    () => [
      {
        name: 'githubUrl',
        label: 'GitHub URL',
        placeholder: 'https://github.com/username',
      },
      {
        name: 'codechefUrl',
        label: 'CodeChef URL',
        placeholder: 'https://www.codechef.com/users/username',
      },
      {
        name: 'codeforcesUrl',
        label: 'Codeforces URL',
        placeholder: 'https://codeforces.com/profile/username',
      },
      {
        name: 'leetcodeUrl',
        label: 'LeetCode URL',
        placeholder: 'https://leetcode.com/u/username',
      },
      {
        name: 'template',
        label: 'Template Type',
        placeholder: 'Modern/Minimal/ATS',
      },
      {
        name: 'resumeType',
        label: 'Resume Type',
        placeholder: 'Software proffessional',
      },
      {
        name: 'phone',
        label: 'Phone Number',
        placeholder: '+1 123-456-7890',
      },
      {
        name: 'email',
        label: 'Email Address',
        placeholder: 'user@example.com',
      },
      {
        name: 'summary',
        label: 'Summary',
        placeholder: 'A brief summary about yourself',
      },
      {
        name: 'customInstruction',
        label: 'Custom Instruction',
        placeholder: 'Any specific instructions for the resume builder',
      },
    ],
    [],
  );

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
      <div className="row justify-content-center align-items-center g-3">
        {fieldDescriptions.map((field) => (
          <div className="col-6" key={field.name}>
            <UrlInput
              {...field}
              register={methods.register}
              error={methods.formState.errors[field.name]?.message}
              helperText={methods.formState.errors[field.name]?.message}
            />
          </div>
        ))}
      </div>

      <div className="mt-4">
        <SubmitButton isLoading={isLoading} disabled={!methods.formState.isValid && methods.formState.submitCount > 0} />
      </div>

    </form>
  );
});

export default ProfileForm;
