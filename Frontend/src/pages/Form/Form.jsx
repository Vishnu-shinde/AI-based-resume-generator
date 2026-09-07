import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ProfileForm from '../../components/form/ProfileForm/ProfileForm';
import { useBuildResumeMutation } from '../../services/resumeApi';
import { setResumeResult, setResumeError, setSubmitting } from '../../features/resume/resumeSlice';
import styles from '../Home/Home.module.css';

const Form = memo(function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [buildResume, { isLoading, error }] = useBuildResumeMutation();

  const handleSubmit = useCallback(
    async (values) => {
      const payload = {
        githubUrl: values.githubUrl || '',
        codechefUrl: values.codechefUrl || '',
        codeforcesUrl: values.codeforcesUrl || '',
        leetcodeUrl: values.leetcodeUrl || '',
      };

      try {
        dispatch(setSubmitting(true));
        const response = await buildResume(payload).unwrap();
        dispatch(setResumeResult(response));
        dispatch(setSubmitting(false));
        navigate('/preview');
      } catch (submitError) {
        dispatch(setSubmitting(false));
        dispatch(setResumeError(submitError?.message || 'Failed to generate resume.'));
        toast.error(submitError?.message || 'Failed to generate resume.');
      }
    },
    [buildResume, dispatch, navigate],
  );

  return (
    <div className="container pb-4 pt-4">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
        <div className={styles.heroPanel}>
          <div>
            <h4 className="fw-bold mb-1 text-center">Build your resume</h4>
            <p className="mb-0 text-14 text-secondary text-center">Enter at least two or more supported profile URLs</p>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
        <div className={`${styles.formPanel} mt-4 d-flex justify-content-center align-items-center flex-column`}>
          <div className="p-5 mt-3 bg-white rounded border shadow-sm w-100">
            {error ? (
              <div className="alert alert-danger mb-3">
                {error?.message || 'Unable to reach the profile builder service.'}
              </div>
            ) : null}
            <ProfileForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </motion.div>
    </div>
  );
});

export default Form;
