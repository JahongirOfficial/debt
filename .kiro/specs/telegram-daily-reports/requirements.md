# Requirements Document

## Introduction

This feature enables the Telegram bot to automatically send daily reports containing debt and user data in both TXT and Excel formats at a scheduled time each day. This provides administrators and users with regular data exports for analysis, backup, and reporting purposes.

## Requirements

### Requirement 1

**User Story:** As an administrator, I want the Telegram bot to automatically send daily reports at a specific time, so that I can receive regular data exports without manual intervention.

#### Acceptance Criteria

1. WHEN the scheduled time arrives THEN the system SHALL generate and send daily reports via Telegram
2. WHEN generating reports THEN the system SHALL create both TXT and Excel format files
3. WHEN the scheduled time is configured THEN the system SHALL allow setting a specific hour and minute for daily execution
4. IF the report generation fails THEN the system SHALL log the error and retry after 30 minutes
5. WHEN reports are sent THEN the system SHALL include the current date in the filename

### Requirement 2

**User Story:** As an administrator, I want to receive comprehensive debt data in the daily reports, so that I can analyze debt trends and user activity.

#### Acceptance Criteria

1. WHEN generating TXT reports THEN the system SHALL include all active debts with user information
2. WHEN generating Excel reports THEN the system SHALL organize data in structured tables with headers
3. WHEN including debt data THEN the system SHALL show debt amount, due date, debtor name, and status
4. WHEN generating reports THEN the system SHALL include summary statistics (total debts, overdue count, etc.)
5. IF there are no debts THEN the system SHALL send a report indicating "No active debts"

### Requirement 3

**User Story:** As an administrator, I want to configure which Telegram users receive the daily reports, so that I can control access to sensitive financial data.

#### Acceptance Criteria

1. WHEN configuring recipients THEN the system SHALL allow adding multiple Telegram user IDs
2. WHEN sending reports THEN the system SHALL only send to authorized recipients
3. WHEN a recipient is not found THEN the system SHALL log the error but continue sending to other recipients
4. IF no recipients are configured THEN the system SHALL send reports to the admin user by default
5. WHEN updating recipient list THEN the system SHALL validate Telegram user IDs before saving

### Requirement 4

**User Story:** As an administrator, I want to configure the report schedule and format options, so that I can customize when and how reports are delivered.

#### Acceptance Criteria

1. WHEN configuring schedule THEN the system SHALL allow setting hour and minute for daily execution
2. WHEN configuring formats THEN the system SHALL allow enabling/disabling TXT and Excel formats independently
3. WHEN saving configuration THEN the system SHALL validate time format (24-hour format)
4. IF configuration is invalid THEN the system SHALL show error message and prevent saving
5. WHEN schedule changes THEN the system SHALL update the cron job immediately

### Requirement 5

**User Story:** As a system, I want to handle file generation and delivery reliably, so that reports are consistently delivered even under error conditions.

#### Acceptance Criteria

1. WHEN generating files THEN the system SHALL create temporary files with unique names
2. WHEN files are sent successfully THEN the system SHALL delete temporary files
3. IF file generation fails THEN the system SHALL log detailed error information
4. WHEN Telegram API fails THEN the system SHALL retry sending up to 3 times
5. IF all retries fail THEN the system SHALL log the failure and schedule next attempt