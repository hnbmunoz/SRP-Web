# GitHub Actions Workflow Pipeline

This directory contains the GitHub Actions workflows for the SRP-Web project, providing automated CI/CD pipeline for testing, building, and deploying the React application.

## 📋 Workflow Overview

### 1. CI/CD Pipeline (`ci-cd.yml`)
**Triggers:** Push to `main`/`develop` branches, Pull requests
**Purpose:** Main continuous integration and deployment workflow

**Jobs:**
- **Test**: Runs on Node.js 18.x and 20.x matrix
  - Code checkout
  - Dependencies installation
  - ESLint linting
  - TypeScript type checking
  - Application build
  - Storybook build
  - Artifact upload

- **Deploy Staging**: Deploys to staging environment (develop branch)
- **Deploy Production**: Deploys to production environment (main branch)
- **Security Scan**: Runs security audits on pull requests

### 2. Pull Request Validation (`pr-validation.yml`)
**Triggers:** Pull request events (opened, synchronize, reopened)
**Purpose:** Comprehensive validation before code merge

**Features:**
- Code formatting checks
- ESLint with annotations
- TypeScript validation
- TODO/FIXME comment detection
- Bundle size analysis
- Security audit
- Dependency checks
- Automated PR comments with results
- Lighthouse performance testing

### 3. Production Deployment (`deploy.yml`)
**Triggers:** Push to `main`, version tags, manual dispatch
**Purpose:** Advanced deployment with multiple hosting options

**Deployment Options:**
- **Netlify** (enabled by default)
- **Vercel** (disabled, can be enabled)
- **AWS S3 + CloudFront** (disabled, can be enabled)

**Features:**
- Manual deployment triggers
- Environment selection (staging/production)
- Pre-deployment checks
- Multiple hosting platform support
- Post-deployment notifications

## 🔧 Setup Instructions

### Required Secrets

Add these secrets to your GitHub repository settings:

#### For Netlify Deployment:
```
NETLIFY_AUTH_TOKEN=your_netlify_auth_token
NETLIFY_SITE_ID=your_netlify_site_id
```

#### For Vercel Deployment (optional):
```
VERCEL_TOKEN=your_vercel_token
ORG_ID=your_vercel_org_id
PROJECT_ID=your_vercel_project_id
```

#### For AWS S3 Deployment (optional):
```
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_s3_bucket_name
CLOUDFRONT_DISTRIBUTION_ID=your_cloudfront_id
```

#### For Lighthouse CI (optional):
```
LHCI_GITHUB_APP_TOKEN=your_lighthouse_token
```

#### For Slack Notifications (optional):
```
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

### Branch Protection Rules

Configure branch protection for `main` and `develop` branches:

1. Go to Settings → Branches
2. Add rule for `main` branch:
   - Require status checks to pass
   - Require branches to be up to date
   - Required status checks: `validate`, `test`
   - Require pull request reviews
   - Dismiss stale reviews when new commits are pushed

## 🚀 Usage

### Automatic Triggers

- **Push to `develop`**: Triggers CI tests and staging deployment
- **Push to `main`**: Triggers CI tests and production deployment
- **Pull Request**: Triggers validation workflow with comprehensive checks
- **Version Tag**: Triggers production deployment

### Manual Deployment

1. Go to Actions tab in GitHub
2. Select "Deploy to Production" workflow
3. Click "Run workflow"
4. Choose environment (staging/production)
5. Optionally skip tests for hotfixes

### Monitoring Deployments

- Check the Actions tab for workflow status
- Review deployment logs for any issues
- Monitor build artifacts and bundle sizes
- Check Lighthouse scores for performance

## 📊 Workflow Features

### Code Quality Checks
- ✅ ESLint linting
- ✅ TypeScript type checking
- ✅ Code formatting validation
- ✅ Security vulnerability scanning
- ✅ Bundle size monitoring
- ✅ TODO/FIXME detection

### Performance Monitoring
- ✅ Lighthouse CI integration
- ✅ Bundle size analysis
- ✅ Build time tracking
- ✅ Dependency audit

### Deployment Features
- ✅ Multi-environment support
- ✅ Rollback capabilities
- ✅ Automated notifications
- ✅ Manual deployment triggers
- ✅ Environment-specific builds

## 🔍 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review TypeScript errors

2. **Deployment Failures**
   - Verify secrets are correctly configured
   - Check hosting platform status
   - Review deployment logs

3. **Test Failures**
   - Run tests locally first
   - Check for environment-specific issues
   - Review test configuration

### Debug Steps

1. Check workflow logs in Actions tab
2. Review failed job details
3. Run commands locally to reproduce issues
4. Check repository secrets configuration
5. Verify branch protection rules

## 📈 Metrics and Monitoring

The workflows provide several metrics:
- Build success/failure rates
- Deployment frequency
- Bundle size trends
- Performance scores
- Security vulnerability counts

## 🔄 Workflow Maintenance

### Regular Updates
- Update action versions quarterly
- Review and update Node.js versions
- Monitor security advisories
- Update deployment configurations

### Performance Optimization
- Review bundle size reports
- Optimize build times
- Update caching strategies
- Monitor resource usage

## 📝 Contributing

When modifying workflows:
1. Test changes in a feature branch
2. Document any new requirements
3. Update this README if needed
4. Ensure backward compatibility
5. Test with different scenarios

---

For more information about GitHub Actions, visit the [official documentation](https://docs.github.com/en/actions).