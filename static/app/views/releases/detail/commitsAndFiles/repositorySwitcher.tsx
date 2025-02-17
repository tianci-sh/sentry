import styled from '@emotion/styled';

import {CompactSelect} from 'sentry/components/compactSelect';
import {t} from 'sentry/locale';
import {space} from 'sentry/styles/space';
import type {Repository} from 'sentry/types';
import {useLocation} from 'sentry/utils/useLocation';
import useRouter from 'sentry/utils/useRouter';

interface RepositorySwitcherProps {
  repositories: Repository[];
  activeRepository?: Repository;
}

function RepositorySwitcher({repositories, activeRepository}: RepositorySwitcherProps) {
  const router = useRouter();
  const location = useLocation();

  const handleRepoFilterChange = (activeRepo: string) => {
    router.push({
      ...location,
      query: {...location.query, cursor: undefined, activeRepo},
    });
  };

  const activeRepo = activeRepository?.name;

  return (
    <StyledCompactSelect
      triggerLabel={activeRepo}
      triggerProps={{prefix: t('Filter')}}
      value={activeRepo}
      options={repositories.map(repo => ({
        value: repo.name,
        textValue: repo.name,
        label: <RepoLabel>{repo.name}</RepoLabel>,
      }))}
      onChange={opt => handleRepoFilterChange(String(opt?.value))}
    />
  );
}

export default RepositorySwitcher;

const StyledCompactSelect = styled(CompactSelect)`
  margin-bottom: ${space(1)};
`;

const RepoLabel = styled('div')`
  ${p => p.theme.overflowEllipsis}
`;
